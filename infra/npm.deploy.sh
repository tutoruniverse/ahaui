if [ $CODEBUILD_BUILD_SUCCEEDING -eq 1 ]
then
  rm -rf es/images
  rm -rf lib/images
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
  npm publish --tag $NPM_TAG
fi
