import * as React from "react";
import Modal from "react-modal";
import { Input, MyButton, Icon } from "@codeponder/ui";
import { Heading } from "rebass";
import { RepoAutoComplete } from "./RepoAutoComplete";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 500,
    backgroundColor: "#f9fbfd",
  },
};

export const CreateCodeReviewModal = () => {
  const [open, changeOpen] = React.useState(true);

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={() => changeOpen(false)}
        style={customStyles}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading mb="2rem" color="#07385A" fontSize={6}>
            Create Code Review
          </Heading>
          <Icon
            size={24}
            name="x"
            fill="#0d0d0d"
            style={{
              cursor: "pointer",
            }}
            onClick={() => changeOpen(false)}
          />
        </div>
        <Input placeholder="Descriptive title" />
        <RepoAutoComplete onChange={x => console.log(x)} />
      </Modal>
      <MyButton variant="primary" onClick={() => changeOpen(true)}>
        NEW CODE REVIEW
      </MyButton>
    </>
  );
};
