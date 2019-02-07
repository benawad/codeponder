import { MyButton } from "@codeponder/ui";
import { Field, Formik } from "formik";
import React, { useCallback, useEffect, useRef } from "react";
import * as yup from "yup";
import { scrollToView } from "../../../../utils/domScrollUtils";
import { CommentInputField } from "../../../shared/formik-fields/CommentInputField";
import { FormContainer, FormRow, Separator } from "./components";

export interface TextEditorProps {
  isReply: boolean;
  lineNum?: number;
  submitForm: (props: TextEditorResult) => Promise<void>;
  view: "code-view" | "repo-view";
}

export interface TextEditorResult {
  cancel: boolean;
  lineNum?: number;
  title: string;
  text: string;
}

const cleanSelectedLines = (
  lineNum: number,
  parentElm = document.querySelector(".code-content")
) => {
  console.log("cleanSelectedLines", lineNum);
  parentElm!
    .querySelectorAll(`.is-selected-${lineNum}`)
    .forEach(elm => elm.classList.remove(`is-selected-${lineNum}`));
};

const highlightSelectedLines = (
  lineNum: number,
  parentElm = document.querySelector(".code-content")
) => {
  let numberElm: HTMLElement | null =
    parentElm && parentElm.querySelector(`[data-line-number="${lineNum}"]`);
  numberElm &&
    (numberElm.parentNode as HTMLElement).classList.add(
      `is-selected-${lineNum}`
    );
};

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  text: yup.string().required(),
});

export const CommentForm = ({
  isReply,
  lineNum,
  submitForm,
  view,
}: TextEditorProps) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineNum) {
      highlightSelectedLines(lineNum);
    }
  }, []);

  // make sure the editor is fully visible
  useEffect(() => {
    formRef.current!.classList.add("is-open");
    if (view === "code-view" && formRef.current) {
      scrollToView(formRef.current, 200);
    }
  }, []);

  const onCancel = useCallback(() => {
    if (lineNum) {
      cleanSelectedLines(lineNum);
    }
    formRef.current!.classList.remove("is-open");
    submitForm({ cancel: true } as TextEditorResult);
  }, []);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        title: "",
        text: "",
      }}
      onSubmit={({ text, title }, { resetForm }) => {
        formRef.current!.classList.remove("is-open");
        submitForm({
          cancel: false,
          lineNum,
          title: title.trim(),
          text: text.trim(),
        });
        if (view === "repo-view") {
          resetForm();
        }
      }}
    >
      {({ isValid, errors }) => {
        console.log(errors);
        return (
          <FormContainer
            ref={formRef}
            isReply={isReply}
            view={view}
            className={`${view === "code-view" ? "inner-animate-box" : ""}`}
          >
            {// show title only for question
            !isReply && (
              <FormRow>
                <Field
                  component={CommentInputField}
                  placeholder="Title"
                  name="title"
                  autoFocus={!isReply}
                />
              </FormRow>
            )}
            <FormRow>
              <Field
                component={CommentInputField}
                autoFocus={isReply}
                minHeight="100px"
                name="text"
                placeholder={isReply ? "Type your Reply" : "Type your Question"}
                as="textarea"
              />
            </FormRow>
            <Separator />
            <div className="btn-box">
              {view === "code-view" && (
                <MyButton variant="form" className="btn" onClick={onCancel}>
                  Cancel
                </MyButton>
              )}
              <MyButton
                type="submit"
                variant="form"
                disabled={!isValid}
                className={`primary ${isValid ? "" : "disabled"}`}
              >
                Save
              </MyButton>
            </div>
          </FormContainer>
        );
      }}
    </Formik>
  );
};
