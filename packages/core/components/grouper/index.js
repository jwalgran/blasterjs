import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { themeGet } from "styled-system";
import { COMMON, LAYOUT } from "../../constants";

const OuterGrouper = styled.div`
  ${themeGet("grouper.styles")}
  ${COMMON}
  ${LAYOUT}
`;

// prettier-ignore
const InnerGrouper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.vertical ? "column" : "row")};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  width: 100%;
  height: 100%;

  ${props => {
    return props.gutter !== undefined
      ? css`margin: calc(-0.5 * ${themeGet(`space.${props.gutter}`, props.gutter)});`
      : css`margin: calc(-0.5 * ${themeGet("grouper.space.gutter")});`
  }}

  > * {
    ${props => {
      return props.gutter !== undefined
        ? css`margin: calc(0.5 * ${themeGet(`space.${props.gutter}`, props.gutter)});`
        : css`margin: calc(0.5 * ${themeGet("grouper.space.gutter")});`
    }}
  }

  > *:focus {
    z-index: 1;
  }
`;

const Grouper = ({ vertical, justify, align, gutter, children, ...props }) => {
  return (
    <OuterGrouper {...props}>
      <InnerGrouper vertical={vertical} justify={justify} align={align} gutter={gutter}>
        {children}
      </InnerGrouper>
    </OuterGrouper>
  );
};

Grouper.propTypes = {
  ...COMMON.propTypes,
  ...LAYOUT.propTypes,
  vertical: PropTypes.bool,
  justify: PropTypes.string,
  align: PropTypes.string,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Grouper.defaultProps = {
  justify: "flex-start",
  align: "center"
}

export default Grouper;
