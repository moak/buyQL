const graphql = require("graphql");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/user");
const Product = require("../models/product");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ userId: parent.id });
      }
    },
    bought_products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ boughtBy: parent.id });
      }
    }
  })
});
const AuthType = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    email: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    token: { type: GraphQLString },
    role: { type: GraphQLString },
    user_id: { type: GraphQLString }
  })
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.userId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ available: true });
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const result = await User.findOne({ email: args.email }).exec();

        if (result) {
          throw new Error("Email already taken.");
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(args.email)) {
          throw new Error("Email invalid.");
        }

        const bcryptedPassword = await bcrypt.hash(args.password, 5);

        const newUser = new User({
          first_name: args.first_name,
          last_name: args.last_name,
          password: bcryptedPassword,
          email: args.email,
          role: args.role
        });

        return newUser.save();
      }
    },
    loginUser: {
      type: AuthType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const userDB = await User.findOne({ email: args.email }).exec();

        if (!userDB) {
          throw new Error({ error: "failed", code: 301 });
        }

        const bcryptedPassword = await bcrypt.compare(
          args.password,
          userDB.password
        );

        if (!bcryptedPassword) {
          throw new Error({ error: "failed", code: 301 });
        }

        userDB.token = jwt.sign({ user_id: userDB.id }, config.secret, {
          expiresIn: 60 * 60 * 24
        });

        const response = {
          first_name: userDB.first_name,
          last_name: userDB.last_name,
          email: userDB.email,
          token: userDB.token,
          role: userDB.role,
          user_id: userDB.id
        };
        return response;
      }
    },
    editUser: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        user_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const query = { _id: args.user_id };
        const options = { new: true };
        let update = {};

        if (args.first_name) {
          update.first_name = args.first_name;
        }
        if (args.last_name) {
          update.last_name = args.last_name;
        }
        if (args.email) {
          update.email = args.email;
        }
        if (args.password) {
          update.password = await bcrypt.hash(args.password, 5);
        }
        if (args.role) {
          update.role = args.role;
        }

        return User.findOneAndUpdate(query, update, options, (err, doc) => {
          if (err) {
            throw new Error("An error happened.");
          }
          console.log({
            first_name: doc.first_name,
            last_name: doc.last_name,
            email: doc.email,
            password: doc.password,
            role: doc.role,
            id: doc._id
          });
          return {
            first_name: doc.first_name,
            last_name: doc.last_name,
            email: doc.email,
            password: doc.password,
            role: doc.role,
            id: doc._id
          };
        });
      }
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        user_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const newProduct = new Product({
          name: args.name,
          description: args.description,
          price: args.price,
          userId: args.user_id,
          available: true,
          boughtBy: null
        });
        return newProduct.save();
      }
    },
    buyProduct: {
      type: ProductType,
      args: {
        product_id: { type: new GraphQLNonNull(GraphQLID) },
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        cvv: { type: new GraphQLNonNull(GraphQLString) },
        card_number: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const productDB = await Product.findOne({
          _id: args.product_id
        }).exec();

        if (!productDB.available) {
          throw new Error("Product not available.");
        }

        return Product.findOneAndUpdate(
          { _id: args.product_id },
          { available: false, boughtBy: args.user_id },
          (err, doc) => {
            if (err) {
              throw new Error("An error happened.");
            }

            return doc;
          }
        );
      }
    },
    deleteProduct: {
      type: ProductType,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        Product.remove({ _id: args.productId }, function(err, doc) {
          if (err) {
            return sendError(res, err);
          } else {
            return doc;
          }
        });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
