import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: grey[500],
  },
}));

function RecipeReviewCard(props) {
  const {
    children: { name, memo, creator, imageUrl },
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={creator?.avatarUrl}
          >
            {/* 프로필 사진이 없다면 유저 네임의 첫 글자를 아바타 사진으로 함. */}
            {creator && creator.name ? creator.name.substring(0, 1) : "대"}
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={
          imageUrl
            ? imageUrl
            : "https://image.flaticon.com/icons/svg/714/714820.svg"
        }
        title="화장실 이미지"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {memo}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RecipeReviewCard;
