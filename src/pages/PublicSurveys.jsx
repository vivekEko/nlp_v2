import React from 'react'
import logo from "../assets/global/header/company_logo.svg"

const PublicSurveys = () => {
    const pageData = {
    config: {
    bg_image: "",
    primary_color: "",
    secondary_color: "",
    total_time: 5000,
}, 

    welcome_screen: {
    logo:"",
    heading:"Net Promoter Score Survey",
    sub_text: "",
    start_button_text:"Start"
},

    contents: [
    {
        question: "Name",
        type: "small_text", 
        answer: ""
    },
    {
        question: "Gender",
        type: "mcq", 
        options: [
            "Male", "Female", "Other", "Prefer not to say"
        ],
        answer: "" 
    },
    {
        question: "Email",
        type: "email", 
        answer: ""
    },
    {
        question: "Age",
        type: "number", 
        answer: ""
    },
    {
        question: "Phone Number",
        type: "number", 
        answer: ""
    },
    {
        question: "On a scale of 0 to 10, how likely are you to recommend our company/product/service to a friend or colleague?",
        type: "range",
        start_and_end_word: ["Not likely at all", "Extremely likely"], 
        answer: ""
    },
    {
        question: " In your opinion, what improvements could the company make that would warrant a higher rating from you? ",
        type: "textarea", 
        answer: ""
    },
    {
        question: "How well our service meets your needs?",
        type: "list", 
        options: [
            "Extremely well", "Very well", "Somewhat well", "Not so well","Not at all well"
        ],
        answer: ""
    },
    {
        question: "How would you rate our quality of service?",
        type: "star", 
        answer: ""
    },

]
    }
  return (
    <div className='bg-[url(../template_1_bg.svg)] h-screen bg-fixed bg-cover bg-center bg-no-repeat flex justify-center items-center w-full'>
       <div className=''>
       <img src={logo} alt="company logo" className='mx-auto w-full max-w-[10 0px] ' />
        <h1 className='text-[#17286d] text-3xl font-semibold my-10'>{pageData?.welcome_screen?.heading}</h1>
        <button className='px-10 py-3 rounded-lg mx-auto block  bg-[#17286d] text-lg font-medium tracking-widest text-white'>{pageData?.welcome_screen?.start_button_text}</button>
       </div>
    </div>
  )
}

export default PublicSurveys