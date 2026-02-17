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
          <div className="[grid-area:image] bg-[var(--color-primary)] text-[var(--color-primary-opposite)] grid place-content-center min-h-full h-0 aspect-square rounded-full text-[var(--fz-500)]">
            {comment.user.name[0].toUpperCase()}
          </div>
          <div className="[grid-area:name] text-[var(--fz-500)] font-bold">
            {comment.user.name}
          </div>
          <div className="[grid-area:date] text-[var(--fz-300)]">
            {formatter.format(relativeTimeInDays, "days")}
          </div>
          <div className="[grid-area:rating] rounded-[var(--border-radius)] text-[var(--fz-500)] font-bold">
            {comment.rating}{" "}
            <Star className="text-[var(--color-star)] mb-[-0.15em]" />
          </div>
        </div>
        <div className="whitespace-pre-line">{comment.text}</div>
      </div>
    </CardComponent>
  );
}
