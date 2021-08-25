import { Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const CategoryPieChart = ({ bookData }) => {
	const label = bookData.map((data) => data.name);
	const numberOfBooks = bookData.map((data) => data.number);
	const data = {
		labels: label,
		datasets: [
			{
				label: "# of Users",
				data: numberOfBooks,
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
			<Typography variant="h6">Books According to Category</Typography>
			<Pie data={data} />
		</>
	);
};

export default CategoryPieChart;
