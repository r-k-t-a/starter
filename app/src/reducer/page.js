var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var PAGE_LOAD = 'page/load';
export function page(state, _a) {
    var _b;
    if (state === void 0) { state = {}; }
    var payload = _a.payload, type = _a.type, url = _a.url;
    switch (type) {
        case PAGE_LOAD:
            return __assign(__assign({}, state), (_b = {}, _b[url] = payload, _b));
        default:
            return state;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBa0JyQyxNQUFNLFVBQVUsSUFBSSxDQUFDLEtBQXFCLEVBQUUsRUFBdUM7O0lBQTlELHNCQUFBLEVBQUEsVUFBcUI7UUFBSSxvQkFBTyxFQUFFLGNBQUksRUFBRSxZQUFHO0lBQzlELFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxTQUFTO1lBQ1osNkJBQVksS0FBSyxnQkFBRyxHQUFHLElBQUcsT0FBTyxPQUFHO1FBQ3RDO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDIn0=