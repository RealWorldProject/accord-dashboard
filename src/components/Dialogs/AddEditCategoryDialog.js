import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "../../redux/slices/category.slice";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddEditCategoryDialog({
	open,
	setOpen,
	categoryData = "",
	slugData = "",
	imageData = "",
	id = "",
}) {
	const [category, setCategory] = useState(categoryData);
	const [slug, setSlug] = useState(slugData);
	const [image, setImage] = useState(imageData);
	const handleClose = () => {
		setOpen(false);
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		const slugifiedCategory = slugify(e.target.value, { lower: true });
		setSlug(slugifiedCategory);
	};
	const handleDrop = (acceptedFiles) => {
		const selectedImage = acceptedFiles[0];
		const fileReader = new FileReader();
		fileReader.readAsDataURL(selectedImage);
		fileReader.onload = (event) => {
			console.log(event.target.result);
			setImage(event.target.result);
		};
	};
	const dispatch = useDispatch();
	const categoryState = useSelector((state) => state.category);

	const handleSubmit = () => {
		dispatch(addNewCategory({ category, slug, image }));
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={"sm"}
			>
				<DialogTitle id="form-dialog-title">Category</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="category"
						label="Category"
						type="text"
						variant="outlined"
						fullWidth
						value={category}
						onChange={handleCategoryChange}
					/>
					<TextField
						margin="dense"
						id="slug"
						label="Slug"
						type="text"
						variant="outlined"
						value={slug}
						fullWidth
					/>
					<Dropzone
						onDrop={handleDrop}
						accept="image/*"
						minSize={1024}
						maxSize={3072000}
						maxFiles={1}
					>
						{({ getRootProps, getInputProps }) => (
							<div {...getRootProps({ className: "dropzone" })}>
								<input {...getInputProps()} />
								<p>
									Drag'n'drop images, or click to select files
								</p>
							</div>
						)}
					</Dropzone>
					{image !== "" ? (
						<div className="previewDiv">
							<img
								src={image}
								alt="category"
								className="previewImage"
							/>
							<Button
								className="previewButton"
								variant="contained"
								color="secondary"
								onClick={() => {
									setImage("");
								}}
							>
								<DeleteIcon />
							</Button>
						</div>
					) : (
						""
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit} color="primary">
						{categoryState.addStatus === "" ||
						categoryState.addStatus === "SUCCESS" ? (
							"Add Category"
						) : (
							<CircularProgress size={17} />
						)}
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
