import CurrentLoc from "../../common/components/map/CurrentLoc";
import LocationPicker from "../../common/components/map/LocationPicker";
import Modal from "../../common/components/map/Modal";
import { LOCATION_SELECT_OPTIONS } from "../constants/authConstants";

export default function AuthLocationField({
  value,
  onChange,
  showMap,
  onCloseMap,
  onLocationSelected,
  resetKey,
}) {
  return (
    <>
      <div className="form-floating loginDivs">
        <select
          className="form-select loginInputs"
          style={{ textAlignLast: "left" }}
          value={value}
          onChange={onChange}
          required
          id="auth-location-select"
          aria-label="Auth location selection"
        >
          <option value="" disabled hidden></option>
          {LOCATION_SELECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label style={{ fontSize: "15px", paddingTop: "12px" }} htmlFor="auth-location-select">
          LOCATION
        </label>
      </div>

      {value === "Use Current Location" && (
        <CurrentLoc key={resetKey} sendLoc={onLocationSelected} />
      )}

      <Modal show={showMap} onClose={onCloseMap}>
        <LocationPicker sendLoc={onLocationSelected} text="Select Hospital Location" />
      </Modal>
    </>
  );
}
