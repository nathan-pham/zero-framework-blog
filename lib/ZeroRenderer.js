const OPEN_DEL = "{{";
const CLOSE_DEL = "}}";

export default class ZeroRenderer {
    constructor(content = "", data = {}) {
        this.content = content;
        this.locals = data;
    }

    evaluate(sectionContent) {
        if (
            !sectionContent.startsWith("return") &&
            sectionContent.trim().split("\n").length === 1
        ) {
            // only auto add return on single vars
            return this.evaluate(`return ${sectionContent}`);
        }

        return new Function(`with(this.locals) { 
            try {
                ${sectionContent}
            } catch(e) {
                return e;
            }
        }`).call(this);
    }

    compile() {
        let content = "";
        let currentIndex = 0;
        while (currentIndex < this.content.length) {
            const startIndex = this.content.indexOf(OPEN_DEL, currentIndex);
            const endIndex = this.content.indexOf(CLOSE_DEL, currentIndex);

            if (startIndex === -1 || endIndex === -1) {
                content += this.content.substring(currentIndex);
                break;
            }

            const sectionContent = this.evaluate(
                this.content
                    .substring(startIndex + OPEN_DEL.length, endIndex)
                    .trim()
            );

            content += this.content.substring(currentIndex, startIndex);

            if (sectionContent) {
                content += sectionContent;
            }

            currentIndex = endIndex + CLOSE_DEL.length;
        }

        return content;
    }
}
