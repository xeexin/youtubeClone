let videos = [
  {
    title: "#1",
    rating: 5,
    comment: 2,
    createdAt: "2 min age",
    view: 1,
    id: 1,
  },
  {
    title: "#2",
    rating: 5,
    comment: 2,
    createdAt: "2 min age",
    view: 25,
    id: 2,
  },
  {
    title: "#3",
    rating: 5,
    comment: 2,
    createdAt: "2 min age",
    view: 11,
    id: 3,
  },
  {
    title: "#4",
    rating: 5,
    comment: 2,
    createdAt: "2 min age",
    view: 35,
    id: 4,
  },
];

//global
export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

//video
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
