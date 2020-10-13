describe ("Display correct icon", function() {
    describe("Get Icon function", function() {
        it("should return hotel icon", function() {
            expect(getIcon("lodging")).toBe("https://www.flaticon.com/svg/static/icons/svg/897/897061.svg");
        });
        it("should return restaurant icon", function() {
            expect(getIcon("restaurant")).toBe("https://www.flaticon.com/svg/static/icons/svg/3556/3556680.svg");
        });
        it("should return shopping mall icon", function() {
            expect(getIcon("shopping_mall")).toBe("https://www.flaticon.com/svg/static/icons/svg/831/831209.svg");
        });
        it("should return bar icon", function() {
            expect(getIcon("bar")).toBe("https://www.flaticon.com/svg/static/icons/svg/761/761767.svg");
        });
        it("should return spa icon", function() {
            expect(getIcon("spa")).toBe("https://www.flaticon.com/svg/static/icons/svg/2751/2751542.svg");
        });
        it("should return night club icon", function() {
            expect(getIcon("night_club")).toBe("https://www.flaticon.com/svg/static/icons/svg/3093/3093998.svg");
        });
        it("should return point of interest icon", function() {
            expect(getIcon("point_of_interest")).toBe("https://www.flaticon.com/svg/static/icons/svg/883/883746.svg");
        });
        it("should return generic icon if icon is not available", function() {
            expect(getIcon("tree")).toBe("https://www.flaticon.com/svg/static/icons/svg/944/944551.svg");
        });
    });
});

