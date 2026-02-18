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
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div
            className="size-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-base font-bold"
            aria-hidden
          >
            {comment.user.name[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-foreground">{comment.user.name}</div>
            <div className="text-sm text-muted-foreground">
              {formatter.format(relativeTimeInDays, "days")}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 font-bold text-foreground">
            <span>{comment.rating}</span>
            <Star className="size-5 text-amber-500" aria-hidden />
          </div>
        </div>
        <p className="whitespace-pre-line text-foreground m-0">
          {comment.text}
        </p>
      </div>
    </CardComponent>
  );
}
