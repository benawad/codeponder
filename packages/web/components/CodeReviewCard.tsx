import { Card, Icon, Grid } from "semantic-ui-react";
import { ListCodeReviewsQuery_listCodeReviews } from "../lib/schema-types";

const CHAR_COUNT = 90;

export const CodeReviewCard = ({
  crr,
  onOfferClick,
  showOfferButton
}: {
  crr: ListCodeReviewsQuery_listCodeReviews;
  onOfferClick: () => void;
  showOfferButton: boolean;
}) => (
  <Grid.Column key={crr.id} width={4}>
    <Card>
      <Card.Content>
        <Card.Header>{crr.owner.username} wants a review</Card.Header>
        <Card.Meta>
          <span className="date">in {crr.numDays} days</span>
        </Card.Meta>
        <Card.Description>
          {`${crr.notes.slice(0, CHAR_COUNT)}${
            crr.notes.length > CHAR_COUNT ? "..." : ""
          }`}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {showOfferButton ? (
          <a onClick={onOfferClick}>
            <Icon name="user" />
            Offer Review
          </a>
        ) : (
          <div>your code review</div>
        )}
      </Card.Content>
    </Card>
  </Grid.Column>
);
