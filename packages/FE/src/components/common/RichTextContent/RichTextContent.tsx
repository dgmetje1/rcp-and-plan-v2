import { Parser as HTMLToReactParser } from "html-to-react";

import { RichTextContentProps } from "./types";

const { parse } = HTMLToReactParser();

const RichTextContent = ({ content }: RichTextContentProps) => {
  const reactElement = parse(content);
  return reactElement;
};

export default RichTextContent;
