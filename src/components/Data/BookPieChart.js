import { Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const BookPieChart = ({ bookData }) => {
	const data = {
		labels: ["Approved", "Rejected", "Pending"],
		datasets: [
			{
				label: "# of Books",
				data: bookData,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<>
			<Typography variant="h6">Books</Typography>
			<Pie data={data} />
		</>
	);
};

export default BookPieChart;
