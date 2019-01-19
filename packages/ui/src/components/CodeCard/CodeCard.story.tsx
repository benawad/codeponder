import * as React from "react";

import { storiesOf } from "@storybook/react";
import { CodeCard } from ".";

// 5895 characters for 13 lines of code
const code =
  '<div class="token-line"><span class="line-number" data-line-number="1"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span></span></div><div class="token-line"><span class="line-number" data-line-number="2"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button><span class="token keyword">import</span> <span class="token punctuation">{</span> Input <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@codeponder/ui"</span><span class="token punctuation">;</span></span></div><div class="token-line"><span class="line-number" data-line-number="3"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button><span class="token keyword">import</span> <span class="token punctuation">{</span> FieldProps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"formik"</span><span class="token punctuation">;</span></span></div><div class="token-line"><span class="line-number" data-line-number="4"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button></span></div><div class="token-line"><span class="line-number" data-line-number="5"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button><span class="token keyword">export</span> <span class="token keyword">const</span> InputField <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span></span></div><div class="token-line"><span class="line-number" data-line-number="6"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button>  field<span class="token punctuation">,</span> <span class="token comment">// { name, value, onChange, onBlur }</span></span></div><div class="token-line"><span class="line-number" data-line-number="7"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button>  form<span class="token punctuation">:</span> <span class="token punctuation">{</span> touched<span class="token punctuation">,</span> errors <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// also values, setXXXX, handleXXXX, dirty, isValid, status, etc.</span></span></div><div class="token-line"><span class="line-number" data-line-number="8"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button>  <span class="token operator">...</span>props</span></div><div class="token-line"><span class="line-number" data-line-number="9"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button><span class="token punctuation">}</span><span class="token punctuation">:</span> FieldProps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>any</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span></div><div class="token-line"><span class="line-number" data-line-number="10"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button>  <span class="token keyword">const</span> errorText <span class="token operator">=</span> touched<span class="token punctuation">[</span>field<span class="token punctuation">.</span>name<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> errors<span class="token punctuation">[</span>field<span class="token punctuation">.</span>name<span class="token punctuation">]</span><span class="token punctuation">;</span></span></div><div class="token-line"><span class="line-number" data-line-number="11"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button></span></div><div class="token-line"><span class="line-number" data-line-number="12"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button>  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Input</span> <span class="token attr-name">errorText</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>errorText<span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">field</span><span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token punctuation">;</span></span></div><div class="token-line"><span class="line-number" data-line-number="13"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button><span class="token punctuation">}</span><span class="token punctuation">;</span></span></div><div class="token-line"><span class="line-number" data-line-number="14"></span><span class="token-html"><button class="btn-open-edit token-btn hidden"><span>+</span></button></span></div>';

const selectedLines = [
  `& .token-line:nth-child(n+4):nth-child(-n+10) {
    background: hsla(24, 20%, 50%,.08);
    background: linear-gradient(to right, hsla(24, 20%, 50%,.1) 70%, hsla(24, 20%, 50%,0));
   }`,
];

storiesOf("Code Card", module).add("code highlight example", () => (
  <div
    style={{
      fontSize: "100%",
      margin: "1.5rem",
      lineHeight: "1.5",
    }}
  >
    <h1>
      <u>Code Highlight Example</u>
    </h1>
    <h2>Using prism-coy theme</h2>

    <CodeCard lang={"jsx"} selectedLines={selectedLines}>
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </CodeCard>
  </div>
));
