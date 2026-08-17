import './index.css'

const SomethingWentWrongComponent = ({ onClickTryAgain }) => {
  return (
    <div className="something-went-wrong-container">
      <img
        src="/assets/something-went-wrong.svg"
        alt="failure view"
        className="something-went-wrong-image"
      />
      <p className="something-went-wrong-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )
}

export default SomethingWentWrongComponent
