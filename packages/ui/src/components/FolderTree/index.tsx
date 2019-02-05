import * as React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

interface TreeItem {
  name: string;
  type: string;
}

interface Props {
  items: TreeItem[];
  Link: any;
  getLinkProps: (path: string) => any;
}

const Container = styled.div`
  border: 0.1rem solid #d7eeff;
  border-radius: 9px;
  overflow: hidden;
  box-shadow: 0.5rem 0.5rem 0.3rem -0.1rem #b7b7b7;
`;

const A = styled.a`
  padding-left: 1rem;
  color: #113f60;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const iconProps = {
  fill: "#78909C",
  // style: {
  //   color: "#78909C",
  //   height: "1.6rem",
  //   width: "1.6rem",
  // },
  // fontSize: "small" as "small",
};

export const FolderTree: React.FunctionComponent<Props> = ({
  items,
  Link,
  getLinkProps,
}) => (
  <Container>
    {items.map((item, idx) => {
      return (
        <div
          key={`${item.name}-${idx}`}
          style={{
            backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F3FAFF",
            fontFamily: "Rubik",
            fontSize: "1.2rem",
            padding: ".8rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.type === "tree" ? (
            <Icon {...iconProps} name="folder" />
          ) : (
            <Icon {...iconProps} name="file" />
          )}

          <Link {...getLinkProps(item.name)}>
            <A>{item.name}</A>
          </Link>
        </div>
      );
    })}
  </Container>
);

export default FolderTree;
