import * as React from "react";
import styled from "styled-components";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/InsertDriveFile";

interface TreeItem {
  path: string;
  type: string;
  url: string;
}

interface Props {
  items: TreeItem[];
  onItemPress: (path: string) => void;
}

const Container = styled.div`
  border: 1px solid #d7eeff;
  border-radius: 9px;
  overflow: hidden;
  box-shadow: 5px 5px 3px -1px #b7b7b7;
`;

const A = styled.a`
  padding-left: 10px;
  color: #113f60;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const iconProps = {
  style: {
    color: "#78909C",
    height: 16,
    width: 16
  },
  fontSize: "small" as "small"
};

const FolderTree: React.FunctionComponent<Props> = ({ items, onItemPress }) => (
  <Container>
    {items.map((item, idx) => {
      return (
        <div
          style={{
            backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F3FAFF",
            fontFamily: "Rubik",
            fontSize: 12,
            padding: 8,
            display: "flex",
            alignItems: "center"
          }}
        >
          {item.type === "tree" ? (
            <FolderIcon {...iconProps} />
          ) : (
            <FileIcon {...iconProps} />
          )}

          <A href="#" onClick={() => onItemPress(item.path)}>
            {item.path}
          </A>
        </div>
      );
    })}
  </Container>
);

export default FolderTree;
