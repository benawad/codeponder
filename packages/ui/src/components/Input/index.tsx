import * as React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { icons } from "../Icon/icons";

const Container = styled.div`
  padding: 0.8rem 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
`;

const MyInput = styled.input`
  padding-left: .1rem;
  border: none;
  font-size: 1.6rem
  color: #b7c1c6;
  font-family: roboto;
  width: 100%;
`;

interface Props extends React.HTMLProps<HTMLInputElement> {
  icon?: keyof typeof icons;
}

export class Input extends React.PureComponent<Props> {
  render() {
    const { icon, style, ...props } = this.props;
    return (
      <Container style={style}>
        {icon && (
          <Icon name={icon} fill="#b7c1c6" style={{ marginRight: ".8rem" }} />
        )}
        <MyInput {...props as any} />
      </Container>
    );
  }
}
