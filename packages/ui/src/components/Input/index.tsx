import * as React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { icons } from "../Icon/icons";

const Container = styled.div`
  padding: 0.8rem 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  border-radius: 0.5rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const MyInput = styled.input`
  padding-left: .1rem;
  border: none;
  font-size: 1.6rem
  font-family: roboto;
  width: 100%;
`;

interface Props extends React.HTMLProps<HTMLInputElement> {
  big?: boolean;
  errorText?: string;
  icon?: keyof typeof icons;
}

export class Input extends React.PureComponent<Props> {
  render() {
    const { icon, style, errorText, big, ...props } = this.props;
    return (
      <div style={style}>
        <Container>
          <Row>
            {icon && (
              <Icon
                name={icon}
                fill="#b7c1c6"
                style={{ marginRight: ".8rem" }}
              />
            )}
            <MyInput
              style={{ fontSize: big ? "2rem" : "1.6rem" }}
              {...props as any}
            />
          </Row>
        </Container>
        {errorText && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
        )}
      </div>
    );
  }
}
