//global
export const trending = (req, res) => res.send("Home Page Videos");
export const search = (req, res) => res.send("search");

//video
export const see = (req, res) => {
  res.send(`Watch video #${req.params.id}`);
};
export const edit = (req, res) => {
  res.send("Edit Video");
};
export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const upload = (req, res) => res.send("Upload Video");
