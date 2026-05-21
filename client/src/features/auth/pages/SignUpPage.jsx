import InputText from "../../common/components/InputText";
import LoginButton from "../../common/components/LoginButton";
import { ROUTES } from "../../../constants/routeConstants";
import { AUTH_FORM_IDS, AUTH_PAGE_TEXT } from "../constants/authConstants";
import AuthLocationField from "../components/AuthLocationField";
import AuthPageLayout from "../components/AuthPageLayout";
import { useSignup } from "../hooks/useSignup";
import "../../../Views/Signup.css";

export default function SignUpPage() {
	const {
		formData,
		locationMode,
		showMap,
		error,
		resetKey,
		setShowMap,
		handleChange,
		handleSubmit,
		handleLocationModeChange,
		handleLocationSelected,
	} = useSignup();

	return (
		<>
			<AuthPageLayout>
				<form
					onSubmit={handleSubmit}
					id={AUTH_FORM_IDS.SIGNUP}
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
					<h2>{AUTH_PAGE_TEXT.SIGNUP_TITLE}</h2>

					<InputText
						label="HOSPITAL NAME"
						name="hospitalname"
						value={formData.hospitalname}
						type="text"
						onChange={handleChange}
					/>
					<InputText
						label="EMAIL"
						name="email"
						value={formData.email}
						type="email"
						onChange={handleChange}
					/>
					<InputText
						label="PASSWORD"
						name="password"
						value={formData.password}
						type="password"
						onChange={handleChange}
					/>

					<AuthLocationField
						value={locationMode}
						onChange={handleLocationModeChange}
						showMap={showMap}
						onCloseMap={() => setShowMap(false)}
						onLocationSelected={handleLocationSelected}
						resetKey={resetKey}
					/>

					{error ? <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p> : null}

					<LoginButton myForm={AUTH_FORM_IDS.SIGNUP} button={AUTH_PAGE_TEXT.SIGNUP_CTA} />

					<p>
						{AUTH_PAGE_TEXT.SIGNUP_TO_LOGIN}
						<a style={{ color: "black" }} href={ROUTES.LOGIN}>
							Login
						</a>
					</p>
				</form>
			</AuthPageLayout>
		</>
	);
}
