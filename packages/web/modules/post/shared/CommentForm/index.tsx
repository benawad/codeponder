import { Icon, MyButton } from "@codeponder/ui";
import { Field, Formik } from "formik";
import React, { useCallback, useEffect, useRef } from "react";
import * as yup from "yup";
import { scrollToView } from "../../../../utils/domScrollUtils";
import { CommentInputField } from "../../../shared/formik-fields/CommentInputField";
import { MarkdownEditor } from "../MarkdownEditor";
import { FormContainer, FormRow } from "./components";

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

const questionSchema = yup.object().shape({
  title: yup.string().required(),
  text: yup.string().required(),
});

const replySchema = yup.object().shape({
  text: yup.string().required(),
});

export const CommentForm = ({
  isReply,
  lineNum,
  submitForm,
  view,
}: TextEditorProps) => {
  const formRef = useRef<HTMLFormElement>(null);

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
    setTimeout(() => {
      submitForm({ cancel: true } as TextEditorResult);
    }, 200);
  }, []);

  return (
    <Formik
      validationSchema={isReply ? replySchema : questionSchema}
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
      {({ isValid, handleSubmit, values, handleChange }) => {
        return (
          <FormContainer
            onSubmit={handleSubmit}
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
            <div className="editor-outer-box">
              <MarkdownEditor
                isReply={isReply}
                text={values.text}
                textChange={handleChange}
              />
              <div className="editor-footer">
                <a
                  href="https://guides.github.com/features/mastering-markdown"
                  target="_blank"
                >
                  <Icon size={16} name="markdown" fill="#000" />
                  Styling with Markdown is supported
                </a>
                <div className="btn-box">
                  {view === "code-view" && (
                    <MyButton
                      type="button"
                      variant="form"
                      className="btn"
                      onClick={onCancel}
                    >
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
              </div>
            </div>
          </FormContainer>
        );
      }}
    </Formik>
  );
};
