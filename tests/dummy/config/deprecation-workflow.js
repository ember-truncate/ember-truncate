/**
 * Once a deprecation is addressed, configure its handler to `throw`.
 * Please do not remove an entry until the upgrade effort is stable.
 */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  // If we un-comment the line below, any unhandled error i.e a new error introduced would fail the tests.
  // throwOnUnhandled: true,
  workflow: [
    {
      handler: 'silence',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
    { handler: 'silence', matchId: 'ember-global' },
    { handler: 'silence', matchId: 'this-property-fallback' },
  ],
};
