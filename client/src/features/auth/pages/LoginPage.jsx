import InputText from "../../common/components/InputText";
import LoginButton from "../../common/components/LoginButton";
import { ROUTES } from "../../../constants/routeConstants";
import { AUTH_FORM_IDS, AUTH_PAGE_TEXT } from "../constants/authConstants";
import AuthPageLayout from "../components/AuthPageLayout";
import { useLogin } from "../hooks/useLogin";
import "../../../Views/Login.css";

export default function LoginPage() {
	const { formData, error, handleChange, handleSubmit } = useLogin();

	return (
		<>
			<AuthPageLayout>
				<form
					onSubmit={handleSubmit}
					id={AUTH_FORM_IDS.LOGIN}
					style={{
						width: "50%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: "20px",
					}}
					action="#"
				>
					<h2>{AUTH_PAGE_TEXT.LOGIN_TITLE}</h2>

					<InputText
						label="EMAIL"
						value={formData.email}
						name="email"
						type="email"
						onChange={handleChange}
					/>
					<InputText
						label="PASSWORD"
						value={formData.password}
						name="password"
						type="password"
						onChange={handleChange}
					/>

					{error ? <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p> : null}

					<LoginButton myForm={AUTH_FORM_IDS.LOGIN} button={AUTH_PAGE_TEXT.LOGIN_CTA} />

					<p>
						{AUTH_PAGE_TEXT.LOGIN_TO_SIGNUP}{" "}
						<a style={{ color: "black" }} href={ROUTES.SIGNUP}>
							Create new
						</a>
					</p>
				</form>
			</AuthPageLayout>
		</>
	);
}
