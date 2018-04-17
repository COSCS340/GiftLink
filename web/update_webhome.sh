REPO="./GiftLink"
IMAGES="$REPO/web/images/*"
JS="$REPO/web/js/*"
CSS="$REPO/web/css/*"
INDEX="$REPO/web/index.html"
WEBHOME="."

cd GiftLink
git pull
cd ..

if [ ! -d $WEBHOME/js ]; then
	mkdir $WEBHOME/js
fi

if [ ! -d $WEBHOME/images ]; then
	mkdir $WEBHOME/images
fi

if [ ! -d $WEBHOME/css ]; then
	mkdir $WEBHOME/css
fi

cp $JS $WEBHOME/js
cp $IMAGES $WEBHOME/images
cp $CSS $WEBHOME/css
cp $INDEX $WEBHOME
cp $REPO/web/privacy_policy.html $WEBHOME
