---js
{title: 'Houses for Sale page',eleventyNavigation: { key: 'houses', parent: 'main', order: 1 }}
---

{% block content %}

<div class="container">
  <h1>Our Houses</h1>
</div>
<template id="content">
  <div class="content-display">
    <span class="key"></span>
  </div>
</template>
<div class="container">
	<div class="row">
		{% for house in properties -%}
		<div class="col">
			<a class="button button-primary" href="{{house.websiteLink}}" title="{{house.title}}">{{house.title}}</a>
		</div>
		{% endfor -%}
	</div>
</div>
{% endblock %}
