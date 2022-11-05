function calReview(review) {
  let totalReview = 0;
  for (let index = 0; index < review?.length; index++) {
    totalReview += review[index]?.star;
  }
  return totalReview / review?.length;
}

export default calReview;
