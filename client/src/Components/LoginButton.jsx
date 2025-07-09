export default function loginButton({myForm, button}){
    return (
        <div className="form-button loginDivs">
            <button type="submit" form={myForm} className="btn btn-danger loginButton" >{button}
            </button>
        </div>
    )
}