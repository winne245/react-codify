import Homepage from "../components/features/Homepage/Homepage";
import Classroom from "../components/features/Classroom/Classroom";
import Lesson from "../components/features/Lesson/Lesson";
import Practice from "../components/features/Practice/Practice";
import Social from "../components/features/Social/Social";
import NotFound from "../components/shares/NotFound/NotFound";
import Profile from "../components/features/Profile/Profile";

export const routes = [
	{
		path: "/homepage",
		component: Homepage,
	},
	{
		path: "/classroom",
		component: Classroom,
	},
	{
		path: "/lesson",
		component: Lesson,
	},
	{
		path: "/practice",
		component: Practice,
	},
	{
		path: "/social",
		component: Social,
	},
	{
		path: "/*",
		component: NotFound,
	},
	{
		path: "/profile",
		component: Profile,
	},
];
export default routes;
