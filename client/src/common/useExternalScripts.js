import { onMounted } from 'vue';

export default function useExternalScripts() {
    onMounted(() => {
        // 加载第一个外部脚本
        (function () {
            var script1 = document.createElement('script');
            script1.src = './clicklove.js';
            script1.async = true;
            document.body.appendChild(script1);
        })();

        // 加载第二个外部脚本
        (function () {
            var script2 = document.createElement('script');
            script2.src = './busuanzi.pure.mini.js';
            script2.async = true;
            document.body.appendChild(script2);
        })();
    });
}