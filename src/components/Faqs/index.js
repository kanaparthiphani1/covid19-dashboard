import './index.css'

const Faqs = props => {
  const {faqDetails} = props
  const {answer, question} = faqDetails
  return (
    <li className="faq-container">
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </li>
  )
}
export default Faqs
