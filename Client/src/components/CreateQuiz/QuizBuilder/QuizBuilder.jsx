import React, { useState } from 'react'
import styles from './QuizBuilder.module.css'

function QuizBuilder({data}) {
  const [formData,setFormData] =useState(
    {
      quiz_name:data?.quiz_name ?  data.quiz_name : '',
      quiz_type:data?.quiz_type ?  data.quiz_type : '',
    }
  );
  const [question,setQuestion] =useState({question:'',options:[],answer:''});

  console.log(formData)
  
  return (
    <div className={styles.main}>QuizBuilder</div>
  )
}

export default QuizBuilder