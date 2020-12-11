if [ $CODEBUILD_BUILD_SUCCEEDING -eq 1 ]
then
  REACT_APP_ENV=`echo ${ENV} | tr [a-z] [A-Z]`
  echo "s3://$S3"
  aws s3 sync --delete --cache-control max-age=2592000,public public s3://$S3/$VERSION
  aws s3 cp s3://$S3/$VERSION/index.html s3://$S3/$VERSION/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html
  aws s3 cp index.html s3://$S3/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT --paths "/*"
fi
