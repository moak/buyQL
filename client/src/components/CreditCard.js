import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import { buyProductMutation, getProductsQuery } from "../queries/queries";

const CreditCardContainer = styled.div`
  background-color: #ececec;
  border-radius: 3px;
  padding: 1em;
  margin-top: 1em;
`;
const Line = styled.div`
  display: flex;
  margin-bottom: 1em;
`;
const Owner = styled.div`
  margin-right: 1em;
`;
const CVV = styled.div``;

const CardNumber = styled.div`
  margin-bottom: 1em;
  margin-right: 1em;
`;

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      cvv: "",
      cardNumber: "",
      month: "01",
      year: "18"
    };
  }

  submitPayment(event) {
    const { cvv, cardNumber } = this.state;
    const { userAuth, productId } = this.props;

    event.preventDefault();
    this.props.buyProductMutation({
      variables: {
        cvv: cvv,
        card_number: cardNumber,
        user_id: userAuth.user_id,
        product_id: productId
      },
      refetchQueries: [{ query: getProductsQuery }]
    });
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  }
  changeInput(value, type) {
    this.setState({ [type]: value.target.value });
  }
  render() {
    const { owner, cvv, cardNumber, month, year } = this.state;

    return (
      <CreditCardContainer>
        <h3>Buy this product</h3>
        <Form onSubmit={this.submitPayment.bind(this)}>
          <Line>
            <Owner>
              <Form.Field>
                <label>Owner</label>
                <input
                  required
                  onChange={event => this.changeInput(event, "owner")}
                  value={owner}
                  type="text"
                  id="owner"
                />
              </Form.Field>
            </Owner>
            <CVV>
              <Form.Field>
                <label>CVV</label>
                <input
                  required
                  onChange={event => this.changeInput(event, "cvv")}
                  value={cvv}
                  type="text"
                  id="cvv"
                />
              </Form.Field>
            </CVV>
          </Line>
          <Line>
            <CardNumber>
              <Form.Field>
                <label>Card Number</label>
                <input
                  required
                  onChange={event => this.changeInput(event, "cardNumber")}
                  value={cardNumber}
                  type="text"
                  id="cvv"
                />
              </Form.Field>
            </CardNumber>
          </Line>
          <Form.Group inline>
            <Form.Field>
              <label>Phone Number</label>
            </Form.Field>
            <Form.Field>
              <select
                value={month}
                onChange={event => this.changeInput(event, "month")}
              >
                <option value="01">January</option>
                <option value="02">February </option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </Form.Field>
            <Form.Field>
              <select
                value={year}
                onChange={event => this.changeInput(event, "year")}
              >
                <option value="16"> 2016</option>
                <option value="17"> 2017</option>
                <option value="18"> 2018</option>
                <option value="19"> 2019</option>
                <option value="20"> 2020</option>
                <option value="21"> 2021</option>
              </select>
            </Form.Field>
          </Form.Group>
          <Button primary>Pay</Button>
        </Form>
      </CreditCardContainer>
    );
  }
}

export default compose(
  graphql(buyProductMutation, { name: "buyProductMutation" }),
  graphql(getProductsQuery, { name: "getProductsQuery" })
)(CreditCard);
