// turn controller's physics presence on only while button held down
AFRAME.registerComponent("phase-shift", {
  init: function () {
    var el = this.el;
    el.addEventListener("gripdown", function () {
      el.setAttribute("collision-filter", { collisionForces: true });
    });
    el.addEventListener("gripup", function () {
      el.setAttribute("collision-filter", { collisionForces: false });
    });
  },
});

AFRAME.registerComponent("collision-detector", {
  tick: function () {
    const thisEl = this.el;
    const otherEntities = document.querySelectorAll(
      "[collision-detector]:not(.ignore-collision)"
    );

    otherEntities.forEach(function (entity) {
      if (thisEl !== entity && areEntitiesColliding(thisEl, entity)) {
        console.log("Os objetos estão sobrepostos!");
        if (entity.hasAttribute("dynamic-body")) {
          entity.removeAttribute("dynamic-body");
          entity.setAttribute("static-body", "");
        }
      }
    });
  },
});

function areEntitiesColliding(entity1, entity2) {
  const pos1 = entity1.object3D.position;
  const pos2 = entity2.object3D.position;
  const size1 = entity1.getAttribute("scale");
  const size2 = entity2.getAttribute("scale");

  return (
    Math.abs(pos1.x - pos2.x) * 2 < size1.x + size2.x &&
    Math.abs(pos1.y - pos2.y) * 2 < size1.y + size2.y &&
    Math.abs(pos1.z - pos2.z) * 2 < size1.z + size2.z
  );
}
