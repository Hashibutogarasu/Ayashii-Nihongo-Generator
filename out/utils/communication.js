"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTitle = exports.getTitleFromHTML = exports.fetchHTML = void 0;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
async function fetchHTML(link) {
}
exports.fetchHTML = fetchHTML;
function getTitleFromHTML(html) {
    const doms = new JSDOM(html);
    let title = "";
    // titleタグ取得 ====================================================
    title = String(doms.window.document.title);
    // 返還 
    if (title) {
        return String(title);
    }
    // metaタグ取得 =====================================================
    title = "";
    const metas = doms.window.document.getElementsByTagName('meta');
    // propertyタイプから取得
    for (let i = 0; i < metas.length; i++) {
        let pro = metas[i].getAttribute("property");
        if (typeof pro === "string") {
            if (pro.match("title"))
                title = metas[i].getAttribute("content");
        }
    }
    // nameタイプから取得
    for (let i = 0; i < metas.length; i++) {
        let pro = metas[i].getAttribute("name");
        if (typeof pro == "string") {
            if (pro.match("title"))
                title = metas[i].getAttribute("content");
        }
    }
    // 返還 
    if (!title)
        return null;
    return String(title);
}
exports.getTitleFromHTML = getTitleFromHTML;
async function getTitle(link) {
    let pageTitle = "";
    let homepageTitle = "";
    // htmlデータフェッチ ======================================================
    const [page, homepage] = await fetchHTML(link);
    // ページタイトル取得失敗 ====================================================
    if (page === null && homepage === null) {
        return ["ページ情報が取得出来ませんでした。"];
    }
    // タイトル取得 =============================================================
    // 該当ページ
    if (page !== null) {
        var temp = getTitleFromHTML(page);
        if (temp !== null) {
            pageTitle = temp;
        }
    }
    // ホームページ
    if (homepage !== null) {
        var temp = getTitleFromHTML(homepage);
        if (temp !== null) {
            homepageTitle = temp;
        }
    }
    // タイトル生成 =============================================================
    let title;
    title = pageTitle ? pageTitle : "";
    title = homepageTitle ? `${title} | ${homepageTitle}` : title;
    if (title === "") {
        return ["タイトル情報が取得出来ませんでした。"];
    }
    return [title, pageTitle, homepageTitle];
}
exports.getTitle = getTitle;
//# sourceMappingURL=communication.js.map