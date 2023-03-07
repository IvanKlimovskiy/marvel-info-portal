import './charSearchForm.scss'
import {Formik, Form, ErrorMessage, Field} from "formik";
import * as Yup from 'yup';
const CharSearchForm = () => {
  return (
    <Formik initialValues={{
      name: ''
    }} validationSchema={ Yup.object({
      name: Yup.string().required('This field is required')
    }) }
       onSubmit={values => {console.log(JSON.stringify(values, null, 2))}}>
      <Form className={'char__search-form'}>
        <label className={'char__search-label'} htmlFor="name">Or find character by name:</label>
        <div className={'char__search-wrapper'}>
          <Field placeholder={'Enter name'}
                 id={'name'}
                 name={'name'}
                 type={'text'}
          />
          <ErrorMessage className={'char__search-error'} name={'name'} component={'div'}/>
        </div>
        <a href={'#'} className="button button__main">
          <div className="inner">homepage</div>
        </a>
        <a href={'#'} className="button button__secondary">
          <div className="inner">Wiki</div>
        </a>
      </Form>
    </Formik>
  )
}

export default CharSearchForm;
