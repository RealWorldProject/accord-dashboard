import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function BookFilter({ status, setStatus }) {
	const handleChange = (event) => {
		setStatus(event.target.value);
	};

	return (
		<div style={{ display: "inline" }}>
			<FormControl component="fieldset">
				<RadioGroup
					aria-label="gender"
					name="gender1"
					value={status}
					onChange={handleChange}
					row
				>
					<FormControlLabel
						value="PENDING"
						control={<Radio />}
						label="Pending"
					/>
					<FormControlLabel
						value="VERIFIED"
						control={<Radio />}
						label="Verified"
					/>
					<FormControlLabel
						value="REJECTED"
						control={<Radio />}
						label="Rejected"
					/>
				</RadioGroup>
			</FormControl>
		</div>
	);
}
