import { Form, FormProps } from "app/core/components/Form"
import { Field } from "react-final-form"

import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { FieldArray } from "react-final-form-arrays"
import arrayMutators from "final-form-arrays"

export { FORM_ERROR } from "app/core/components/Form"

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="title" placeholder="Title" />
      <LabeledTextField name="author" label="author" placeholder="Author" />
      <LabeledTextField name="content" label="content" placeholder="Content" />

      <LabeledTextField name="comments.0.content" label="Comment 1" />
      <LabeledTextField name="comments.0.author" label="Comment 1 Author" />
    </Form>
  )
}
