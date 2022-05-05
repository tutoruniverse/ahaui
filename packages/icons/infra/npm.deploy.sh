if [ $CODEBUILD_BUILD_SUCCEEDING -eq 1 ]
then
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
  npm publish --tag $NPM_TAG
fi
