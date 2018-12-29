import React, { CSSProperties } from "react";
import Downshift from "downshift";
import { GitHubApolloClientContext } from "./GithubApolloClientContext";
import {
  GetViewerReposComponent,
  GetViewerReposEdges,
} from "./github-apollo-components";
import { Input, Icon, styled } from "@codeponder/ui";

interface Props {
  onChange: (selection: GetViewerReposEdges) => void;
}

const ControllerButton = styled("button")({
  backgroundColor: "transparent",
  border: "none",
  position: "absolute",
  right: 0,
  top: 0,
  cursor: "pointer",
  width: 47,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

function ArrowIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? "rotate(180)" : undefined}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  );
}

const Menu = React.forwardRef(({ isOpen }: { isOpen: boolean }, ref: any) => (
  <ul
    ref={ref}
    style={{
      padding: 0,
      marginTop: 0,
      position: "absolute" as "absolute",
      backgroundColor: "white",
      width: "100%",
      maxHeight: "20rem",
      overflowY: "auto" as "auto",
      overflowX: "hidden" as "hidden",
      outline: "0",
      transition: "opacity .1s ease",
      borderRadius: "0 0 .28571429rem .28571429rem",
      boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)",
      borderColor: "#96c8da",
      borderTopWidth: "0",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderStyle: "solid",
      border: isOpen ? undefined : "none",
    }}
  />
)) as any;

const Item = ({
  isActive,
  isSelected,
}: {
  isActive: boolean;
  isSelected: boolean;
}) => {
  const style: CSSProperties = {
    position: "relative" as "relative",
    cursor: "pointer",
    display: "block",
    border: "none",
    height: "auto",
    textAlign: "left",
    borderTop: "none",
    lineHeight: "1em",
    color: "rgba(0,0,0,.87)",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: 400,
    boxShadow: "none",
    padding: ".8rem 1.1rem",
    whiteSpace: "normal",
    wordWrap: "normal",
  };
  if (isActive) {
    style.color = "rgba(0,0,0,.95)";
    style.background = "rgba(0,0,0,.03)";
  }
  if (isSelected) {
    style.color = "rgba(0,0,0,.95)";
    style.fontWeight = 700;
  }
  return <li style={style} />;
};

const itemToString = (x: GetViewerReposEdges) => (x ? x.node!.name : "");

export class RepoAutoComplete extends React.Component<Props> {
  static contextType = GitHubApolloClientContext;

  render() {
    const { onChange } = this.props;

    return (
      <GetViewerReposComponent client={this.context}>
        {({ data }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 50,
            }}
          >
            <Downshift onChange={onChange} itemToString={itemToString}>
              {({
                // getLabelProps,
                getInputProps,
                getToggleButtonProps,
                getMenuProps,
                getItemProps,
                isOpen,
                clearSelection,
                selectedItem,
                // inputValue,
                highlightedIndex,
              }) => (
                <div style={{ width: 250, margin: "auto" }}>
                  <div style={{ position: "relative" }}>
                    <Input
                      {...getInputProps({
                        placeholder: "Pick a repository",
                      }) as any}
                    />
                    {selectedItem ? (
                      <ControllerButton
                        onClick={clearSelection as any}
                        aria-label="clear selection"
                      >
                        <Icon name="x" fill="#0d0d0d" />
                      </ControllerButton>
                    ) : (
                      <ControllerButton {...getToggleButtonProps()}>
                        <ArrowIcon isOpen={isOpen} />
                      </ControllerButton>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <Menu {...getMenuProps({ isOpen } as any) as any}>
                      {isOpen
                        ? (data && data.viewer && data.viewer.repositories.edges
                            ? data.viewer.repositories.edges
                            : []
                          ).map((item, index) => (
                            <Item
                              key={`${item.node!.owner}/${item.node!.name}`}
                              {...getItemProps({
                                item,
                                index,
                                isActive: highlightedIndex === index,
                                isSelected: selectedItem === item,
                              } as any)}
                            >
                              {itemToString(item)}
                            </Item>
                          ))
                        : null}
                    </Menu>
                  </div>
                </div>
              )}
            </Downshift>
          </div>
        )}
      </GetViewerReposComponent>
    );
  }
}
