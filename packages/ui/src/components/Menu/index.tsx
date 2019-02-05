import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  options: string[];
  renderOption: (data: {
    Anchor: React.ReactElement<any>;
    option: string;
  }) => React.ReactNode;
}

const MenuLink = styled("a")`
  padding: 4px 10px 4px 15px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #3290d4;
  }
`;

export const Menu: React.FC<Props> = ({ children, options, renderOption }) => {
  const [open, changeOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ cursor: "pointer" }} onClick={() => changeOpen(!open)}>
        {children}
      </div>
      {open ? (
        <div
          style={{
            right: 0,
            zIndex: 1,
            backgroundColor: "#fff",
            position: "absolute",
            width: 180,
            marginTop: 4,
            borderRadius: 4,
            border: "1px solid rgba(27,31,35,.15)",
            boxShadow: "0 3px 12px rgba(27,31,35,.15)",
            display: "flex",
            flexDirection: "column",
            padding: "8px 0px",
          }}
        >
          {options.map(o => {
            const Anchor = <MenuLink key={o}>{o}</MenuLink>;

            return renderOption({ Anchor, option: o });
          })}
        </div>
      ) : null}
    </div>
  );
};
