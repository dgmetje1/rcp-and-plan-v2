import { useRouter } from "@tanstack/react-router";

export default () => {
  const router = useRouter();

  const matchWithTitle = [...router.state.matches].reverse().find(d => typeof d.context.getTitle === "function");

  return matchWithTitle?.context.getTitle();
};
