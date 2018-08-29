function addTileViewer(tileset) {
    if (!tileset) {
        console.error("tileset정보 누락됨.");
        return;
    }
    var plan = function (x, y, z) {
        y = -y - 1;
        var limitX = Math.ceil(tileset.maxLimitX / Math.pow(2, z));
        var limitY = Math.ceil(tileset.maxLimitY / Math.pow(2, z));
        if (0 <= y && y < limitY && 0 <= x && x < limitX) {
            return tileset.urlFormat.replace(/{zoom}/, z).replace(/{x}/, x).replace(/{y}/, y);
        }
        else {
            return tileset.whiteImageUrl;
        }
    };
    daum.maps.Tileset.add(tileset.tileName, new daum.maps.Tileset(tileset.tileSize, tileset.tileSize, plan, [new daum.maps.TilesetCopyright("i-Scream", "i-Scream")], false, 0, tileset.maxLevel));
    var node = document.createElement("div");
    node.style.width = "100%";
    node.style.height = "768px";
    document.body.appendChild(node);
    var map = new daum.maps.Map(node, {
        projectionId: null,
        mapTypeId: daum.maps.MapTypeId[tileset.tileName],
        $scale: false,
        center: new daum.maps.Coords(tileset.x, tileset.y),
        level: Math.floor(tileset.maxLevel / 2)
    });
}
;
