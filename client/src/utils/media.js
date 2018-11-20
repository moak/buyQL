// these sizes are arbitrary and you can set them to whatever you wish
import { css } from "styled-components";

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 414
};

export default Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});
