import { ReactElement } from "react";

import { Star } from "lucide-react";

import { CommentModel } from "@/models/comment.model";

import CardComponent from "@/components/card-component/card-component";

const formatter = new Intl.RelativeTimeFormat("fa-IR-u-nu-latn");

type Props = {
  comment: CommentModel;
};

export default function CommentComponent({ comment }: Props): ReactElement {
  const relativeTimeInDays = Math.floor(
    (+comment.date - Date.now()) / (24 * 3600 * 1000),
  );

  return (
    <CardComponent>
      <div className="grid gap-4">
        <div className="grid grid-areas-[image_name_rating;image_date_rating] grid-cols-[auto_1fr_auto] items-start gap-x-3">
          <div className="[grid-area:image] bg-primary text-primary-foreground grid place-content-center min-h-full h-0 aspect-square rounded-full text-lg">
            {comment.user.name[0].toUpperCase()}
          </div>
          <div className="[grid-area:name] text-lg font-bold">
            {comment.user.name}
          </div>
          <div className="[grid-area:date] text-sm">
            {formatter.format(relativeTimeInDays, "days")}
          </div>
          <div className="[grid-area:rating] rounded-lg text-lg font-bold">
            {comment.rating}{" "}
            <Star className="text-amber-500 mb-[-0.15em]" />
          </div>
        </div>
        <div className="whitespace-pre-line">{comment.text}</div>
      </div>
    </CardComponent>
  );
}
