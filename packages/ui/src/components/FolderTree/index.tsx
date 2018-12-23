import * as React from "react";
import styled from "styled-components";

interface TreeItem {
  name: string;
  type: string;
}

interface Props {
  items: TreeItem[];
  Link: any;
  getLinkProps: (path: string) => any;
}


const A = styled.a`
  padding-left: 10px;
  color: #0366d6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Table = styled.table`
    border: 1px solid #d7eeff;
    border-radius: 9px;
    overflow: hidden;
    box-shadow: 5px 5px 3px -1px #b7b7b7;
    border-collapse: collapse;
    width: 100%;
`;

const TR = styled.tr`
    border: 1px solid grey;
`;

export const FolderTree: React.FunctionComponent<Props> = ({
  items,
  Link,
  getLinkProps,
}) => (
  <Table>
  <tbody>
    {items.map((item, idx) => {
      return (
      <TR key={`${item.name}-${idx}`} style={{
            backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F3FAFF",
            fontFamily: "Rubik",
            fontSize: 12,
            padding: 8,
            display: "flex",
            alignItems: "center",
          }}>
        <td>
          {item.type === "tree" ? (
            <svg
              aria-label="directory"
              class="octicon octicon-file-directory"
              viewBox="0 0 14 16"
              version="1.1"
              width="14"
              height="16"
              role="img"
            >
              <path
                  fill-rule="evenodd"
                  d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"
              />
            </svg>
          ) : (
            <svg
              aria-label="file"
              class="octicon octicon-file"
              viewBox="0 0 12 16"
              version="1.1"
              width="12"
              height="16"
              role="img"
            >
              <path
                  fill-rule="evenodd"
                  d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"
              />
            </svg>
          )}
          </td>
          <td>

          <Link {...getLinkProps(item.name)}>
            <A>{item.name}</A>
          </Link>
          </td>
        </TR>
      );
    })}
    </tbody>
    </Table>
);

export default FolderTree;
