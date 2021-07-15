import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import slugify from "slugify";
import { PhotoCamera } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export default function AddEditCategoryDialog({ open, setOpen }) {
	const [category, setCategory] = useState("");
	const [slug, setSlug] = useState("");
	const [image, setImage] = useState("");
	const handleClose = () => {
		setOpen(false);
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		const slugifiedCategory = slugify(e.target.value, { lower: true });
		setSlug(slugifiedCategory);
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
						autoFocus
						margin="dense"
						id="slug"
						label="Slug"
						type="text"
						variant="outlined"
						value={slug}
						fullWidth
					/>
					<input
						accept="image/*"
						style={{ display: "none" }}
						id="raised-button-file"
						multiple
						type="file"
					/>
					<label htmlFor="raised-button-file">
						<Button
							variant="contained"
							color="primary"
							component="span"
						>
							<PhotoCamera />
						</Button>
					</label>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Add Category
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
